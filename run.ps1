$reader = New-Object System.IO.BinaryReader([System.Console]::OpenStandardInput())
$len = $reader.ReadInt32()
$buf = $reader.ReadBytes($len)
$meetLink = [System.Text.Encoding]::UTF8.GetString($buf)
# $meetLink = "https://meet.google.com/hkf-tmzx-izf"

cd app
node bot.js start --link=$meetLink