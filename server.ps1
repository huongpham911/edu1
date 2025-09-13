# Server Management Script for SMA Negeri 1 Ketambe Website
param(
    [Parameter(Mandatory=$false)]
    [ValidateSet("start", "stop", "restart", "status")]
    [string]$Action = "start"
)

$ProcessName = "node"
$ScriptPath = "app.js"
$Port = 3000
$Url = "http://localhost:$Port"

function Start-SchoolServer {
    Write-Host "Starting SMA Negeri 1 Ketambe website server..." -ForegroundColor Green
    
    # Check if already running
    $existing = Get-Process -Name $ProcessName -ErrorAction SilentlyContinue | Where-Object {$_.MainWindowTitle -eq ""}
    if ($existing) {
        Write-Host "Server is already running on port $Port" -ForegroundColor Yellow
        Write-Host "Access the website at: $Url" -ForegroundColor Cyan
        return
    }
    
    try {
        Start-Process -FilePath "node" -ArgumentList $ScriptPath -WindowStyle Hidden
        Start-Sleep -Seconds 2
        
        # Verify server started
        try {
            $response = Invoke-WebRequest -Uri $Url -TimeoutSec 5 -ErrorAction SilentlyContinue
            Write-Host "Server started successfully!" -ForegroundColor Green
            Write-Host "Website is available at: $Url" -ForegroundColor Cyan
        } catch {
            Write-Host "Server started but may not be fully ready yet" -ForegroundColor Yellow
            Write-Host "Please try accessing: $Url" -ForegroundColor Cyan
        }
        
    } catch {
        Write-Host "Failed to start server: $_" -ForegroundColor Red
    }
}

function Stop-SchoolServer {
    Write-Host "Stopping SMA Negeri 1 Ketambe website server..." -ForegroundColor Yellow
    
    try {
        $processes = Get-Process -Name $ProcessName -ErrorAction SilentlyContinue | Where-Object {$_.MainWindowTitle -eq ""}
        if ($processes) {
            $processes | Stop-Process -Force
            Write-Host "Server stopped successfully!" -ForegroundColor Green
        } else {
            Write-Host "No running server found" -ForegroundColor Blue
        }
    } catch {
        Write-Host "Error stopping server: $_" -ForegroundColor Red
    }
}

function Get-ServerStatus {
    Write-Host "Checking SMA Negeri 1 Ketambe website server status..." -ForegroundColor Cyan
    
    $processes = Get-Process -Name $ProcessName -ErrorAction SilentlyContinue | Where-Object {$_.MainWindowTitle -eq ""}
    if ($processes) {
        Write-Host "Server is running" -ForegroundColor Green
        Write-Host "PID: $($processes.Id -join ', ')" -ForegroundColor Gray
        Write-Host "URL: $Url" -ForegroundColor Cyan
        
        # Test connectivity
        try {
            $response = Invoke-WebRequest -Uri $Url -TimeoutSec 5 -ErrorAction SilentlyContinue
            Write-Host "Website is accessible" -ForegroundColor Green
        } catch {
            Write-Host "Website may not be accessible" -ForegroundColor Yellow
        }
    } else {
        Write-Host "Server is not running" -ForegroundColor Red
        Write-Host "Run 'npm run server:start' to start the server" -ForegroundColor Gray
    }
}

function Restart-SchoolServer {
    Write-Host "Restarting SMA Negeri 1 Ketambe website server..." -ForegroundColor Cyan
    Stop-SchoolServer
    Start-Sleep -Seconds 1
    Start-SchoolServer
}

# Main execution
Write-Host "SMA Negeri 1 Ketambe Website Server Manager" -ForegroundColor Blue
Write-Host "=============================================" -ForegroundColor Blue

switch ($Action.ToLower()) {
    "start" { Start-SchoolServer }
    "stop" { Stop-SchoolServer }
    "restart" { Restart-SchoolServer }
    "status" { Get-ServerStatus }
    default { 
        Write-Host "Invalid action: $Action" -ForegroundColor Red
        Write-Host "Usage: npm run server:[start|stop|restart|status]" -ForegroundColor Gray
    }
}

Write-Host ""
