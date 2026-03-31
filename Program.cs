using System;
using System.Buffers.Binary;
using System.Collections.Concurrent;
using System.Net;
using System.Net.Sockets;
using System.Net.WebSockets;
using System.Text;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);
builder.WebHost.UseUrls("http://localhost:8080");

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();
app.UseWebSockets();

var sockets = new ConcurrentDictionary<string, WebSocket>();

app.Map("/telemetry", async context =>
{
    if (context.WebSockets.IsWebSocketRequest)
    {
        using var ws = await context.WebSockets.AcceptWebSocketAsync();
        var id = Guid.NewGuid().ToString();
        sockets.TryAdd(id, ws);

        var buf = new byte[1024];
        try
        {
            while (ws.State == WebSocketState.Open)
            {
                var res = await ws.ReceiveAsync(new ArraySegment<byte>(buf), CancellationToken.None);
                if (res.MessageType == WebSocketMessageType.Close) break;
            }
        }
        catch { }
        finally
        {
            sockets.TryRemove(id, out _);
        }
    }
    else
    {
        context.Response.StatusCode = 400;
    }
});

app.MapFallbackToFile("index.html");

_ = Task.Run(async () =>
{
    try
    {
        var listener = new TcpListener(IPAddress.Any, 9000);
        listener.Start();

        while (true)
        {
            var client = await listener.AcceptTcpClientAsync();
            _ = Task.Run(async () =>
            {
                try
                {
                    using (client)
                    using (var stream = client.GetStream())
                    {
                        var buffer = new byte[8192];
                        while (true)
                        {
                            var read = await stream.ReadAsync(buffer);
                            if (read == 0) break;

                            if (read >= 8)
                            {
                                var angle = BinaryPrimitives.ReadSingleLittleEndian(buffer.AsSpan(4));
                                var payload = JsonSerializer.Serialize(new { angle });
                                var payloadBytes = Encoding.UTF8.GetBytes(payload);

                                foreach (var (_, ws) in sockets)
                                {
                                    if (ws.State == WebSocketState.Open)
                                    {
                                        try
                                        {
                                            await ws.SendAsync(new ArraySegment<byte>(payloadBytes), WebSocketMessageType.Text, true, CancellationToken.None);
                                        }
                                        catch { }
                                    }
                                }
                            }
                        }
                    }
                }
                catch { }
            });
        }
    }
    catch { }
});

app.Run();
