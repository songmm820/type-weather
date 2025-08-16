mod invoke_command;
mod windows;

use crate::invoke_command::{ping, spawn_clock};
use crate::windows::create_main_window;

use tauri::Manager;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let mut builder = tauri::Builder::default();

    #[cfg(desktop)]
    {
        // 当尝试第二次创建实例的时候会走这个回调函数
        builder = builder.plugin(tauri_plugin_single_instance::init(|app, _args, _cwd| {
            if let Some(win) = app.get_webview_window("main") {
                let _ = win.set_focus(); // 聚焦已有窗口
            } else {
                // 为后续实例创建窗口
                create_main_window(app);
            }
        }));
    }

    builder = builder.setup(|app| {
        // 为第一个实例创建窗口
        create_main_window(app);
        spawn_clock(app.handle().clone());
        #[cfg(desktop)]
        app.handle()
            .plugin(tauri_plugin_updater::Builder::new().build())?;
        Ok(())
    });

    builder
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_persisted_scope::init())
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_store::Builder::new().build())
        .invoke_handler(tauri::generate_handler![ping])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
