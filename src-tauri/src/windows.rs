use tauri::{Manager, Runtime, WebviewUrl, WebviewWindowBuilder};

/// 主窗口函数创建
pub fn create_main_window<T, R>(manager: &T)
where
    T: Manager<R>,
    R: Runtime,
{

    let win_builder = WebviewWindowBuilder::new(manager, "main", WebviewUrl::default())
        .inner_size(1200.0, 700.0)
        .min_inner_size(700.0, 700.0)
        .decorations(true)
        .shadow(false)
        .theme(Some(tauri::Theme::Dark))
        .title("ASYBH")
        .resizable(true)
        .center()
        .devtools(true)
        .visible(true);

    win_builder.build().unwrap();
}
