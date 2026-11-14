# 사용자 PC 화면 조작 도우미. 점 소싱: . C:\Users\Public\pc.ps1
Add-Type -AssemblyName System.Windows.Forms, System.Drawing
if (-not ("PcUser32" -as [type])) {
Add-Type @"
using System; using System.Runtime.InteropServices; using System.Text;
public class PcUser32 {
  [DllImport("user32.dll")] public static extern bool SetCursorPos(int x, int y);
  [DllImport("user32.dll")] public static extern void mouse_event(uint f, int x, int y, int d, UIntPtr e);
  [DllImport("user32.dll")] public static extern IntPtr GetForegroundWindow();
  [DllImport("user32.dll")] public static extern int GetWindowText(IntPtr h, StringBuilder s, int n);
  [DllImport("user32.dll")] public static extern bool SetForegroundWindow(IntPtr h);
  [DllImport("user32.dll")] public static extern bool ShowWindow(IntPtr h, int c);
  [DllImport("user32.dll")] public static extern void keybd_event(byte k, byte s, uint f, UIntPtr e);
}
"@
}
function Fg { $sb = New-Object System.Text.StringBuilder 512; [void][PcUser32]::GetWindowText([PcUser32]::GetForegroundWindow(), $sb, 512); $sb.ToString() }
function Find-Window($word) { Get-Process | Where-Object { $_.MainWindowTitle -like "*$word*" } | Select-Object Id, ProcessName, MainWindowTitle }
function Front($id) {
  $p = Get-Process -Id $id
  for ($i = 0; $i -lt 3; $i++) {
    [PcUser32]::keybd_event(0x12, 0, 0, [UIntPtr]::Zero); [void][PcUser32]::ShowWindow($p.MainWindowHandle, 3)
    [void][PcUser32]::SetForegroundWindow($p.MainWindowHandle); [PcUser32]::keybd_event(0x12, 0, 2, [UIntPtr]::Zero)
    Start-Sleep -Milliseconds 500
    if ([PcUser32]::GetForegroundWindow() -eq $p.MainWindowHandle) { return $true }
  }
  return $false
}
function Click($x, $y, $mustTitle) {
  if ($mustTitle -and (Fg) -notlike "*$mustTitle*") { "SKIP click: foreground is '$(Fg)'"; return $false }
  [PcUser32]::SetCursorPos($x, $y); [PcUser32]::mouse_event(2, 0, 0, 0, [UIntPtr]::Zero); [PcUser32]::mouse_event(4, 0, 0, 0, [UIntPtr]::Zero); return $true
}
function Paste($text, $mustTitle) {
  if ($mustTitle -and (Fg) -notlike "*$mustTitle*") { "SKIP paste: foreground is '$(Fg)'"; return $false }
  Set-Clipboard -Value $text; [System.Windows.Forms.SendKeys]::SendWait("^a"); [System.Windows.Forms.SendKeys]::SendWait("^v"); return $true
}
function Keys($keys, $mustTitle) {
  if ($mustTitle -and (Fg) -notlike "*$mustTitle*") { "SKIP keys: foreground is '$(Fg)'"; return $false }
  [System.Windows.Forms.SendKeys]::SendWait($keys); return $true
}
function Grab { $b = [System.Windows.Forms.Screen]::PrimaryScreen.Bounds; $bmp = New-Object System.Drawing.Bitmap $b.Width, $b.Height; $g = [System.Drawing.Graphics]::FromImage($bmp); $g.CopyFromScreen($b.Location, [System.Drawing.Point]::Empty, $b.Size); $bmp }
function Shot($path = "C:\Users\Public\s.jpg", $width = 1280, $crop) {
  $bmp = Grab
  if ($crop) { $bmp = $bmp.Clone((New-Object System.Drawing.Rectangle $crop[0], $crop[1], $crop[2], $crop[3]), $bmp.PixelFormat) }
  elseif ($width -lt $bmp.Width) { $h = [int]($bmp.Height * $width / $bmp.Width); $s = New-Object System.Drawing.Bitmap $width, $h; [System.Drawing.Graphics]::FromImage($s).DrawImage($bmp, 0, 0, $width, $h); $bmp = $s }
  $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Jpeg); "saved $path (fg: $(Fg))"
}
function Pixel($x, $y) { $c = (Grab).GetPixel($x, $y); "$($c.R),$($c.G),$($c.B)" }
function Go($url, $mustTitle) {
  if (-not (Keys "^l" $mustTitle)) { return $false }
  Start-Sleep -Milliseconds 250; Paste $url $mustTitle | Out-Null; Keys "{ENTER}" $mustTitle | Out-Null; return $true
}
