
/// 预载通信测试
#[tauri::command]
pub fn ping() -> &'static str {
    "pong"
}

