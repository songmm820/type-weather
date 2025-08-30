mod invoke_command;
mod windows;

use crate::invoke_command::{get_windows_position, ping, spawn_clock};
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
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_notification::init())
        .plugin(
            tauri_plugin_log::Builder::new()
                .target(tauri_plugin_log::Target::new(
                    tauri_plugin_log::TargetKind::Folder {
                        path: std::path::PathBuf::from("logs"),
                        file_name: None, // 默认值为应用程序名称
                    },
                ))
                .rotation_strategy(tauri_plugin_log::RotationStrategy::KeepAll) // Tauri 可以在日志文件达到大小限制时自动轮换日志文件，而不是丢弃之前的文件。
                .level(log::LevelFilter::Info) // 设置最大日志级别
                .timezone_strategy(tauri_plugin_log::TimezoneStrategy::UseLocal) // 默认情况下，日志插件使用 UTC 时区来格式化日期 但是你可以用以下方式将其配置为使用本地时区
                .build(),
        )
        .invoke_handler(tauri::generate_handler![ping])
        .invoke_handler(tauri::generate_handler![get_windows_position])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");


}
