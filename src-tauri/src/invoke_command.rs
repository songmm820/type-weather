use serde::Serialize;
use tauri::Emitter;
use tokio::time::Duration;

/// 预载通信测试
#[tauri::command]
pub fn ping() -> &'static str {
    "pong"
}

/// 在后台每间隔一段时间发送一次 [年,月,日,时,分,秒]
pub fn spawn_clock(app: tauri::AppHandle) {
    tauri::async_runtime::spawn(async move {
        // 更新间隔
        let mut ticker = tokio::time::interval(Duration::from_secs(300));
        loop {
            ticker.tick().await;
            let now = chrono::Local::now();
            let arr = vec![
                now.format("%Y").to_string(), // 年
                now.format("%m").to_string(), // 月
                now.format("%d").to_string(), // 日
                now.format("%H").to_string(), // 时
                now.format("%M").to_string(), // 分
                                              // now.format("%S").to_string(), // 秒
            ];
            let _ = app.emit("get_live_time", arr);
        }
    });
}

use windows::Devices::Geolocation::Geolocator;

#[derive(Debug, Serialize)]
pub struct GeoPosition {
    longitude: f64,
    latitude: f64,
}
/// 获取windows位置权限
#[tauri::command]
pub fn get_windows_position() -> Result<GeoPosition, String> {
    let locator = Geolocator::new().map_err(|e| e.to_string())?;
    let pos = locator
        .GetGeopositionAsync()
        .map_err(|e| e.to_string())?
        .get()
        .map_err(|e| e.to_string())?;
    // 先把 Point 存下来，避免多次 unwrap
    let point = pos
        .Coordinate()
        .map_err(|_| "no coordinate")?
        .Point()
        .map_err(|_| "no point")?;
    let basic = point.Position().map_err(|_| "no basic position")?;
    let latitude = basic.Latitude;
    let longitude = basic.Longitude;

    log::info!("经度: {longitude}, 纬度: {latitude}");
    println!("经度: {longitude}, 纬度: {latitude}");
    Ok(GeoPosition {
        longitude,
        latitude,
    })
}
