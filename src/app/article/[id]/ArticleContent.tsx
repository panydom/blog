"use client";
import { MdPreview, type Themes } from "md-editor-rt";
import { useTheme } from "next-themes";
import { useMount } from "react-use";

// previewTheme可选值：'default' | 'github' | 'vuepress' | 'mk-cute' | 'smart-blue' | 'cyanosis'

const ArticleContent = ({ content }: { content: string }) => {
    const { theme } = useTheme();
    const editorTheme: Themes = theme === "dark" ? "dark" : "light";

    useMount(() => {
        const editor = document.querySelector("#article-content");
        if (!editor) {
            return;
        }
        // 获取所有a标签并添加target="_blank"
        const links = editor.querySelectorAll("a");
        links.forEach(link => {
            link.setAttribute("target", "_blank");
            // 可选：添加rel="noopener noreferrer"增强安全性
            link.setAttribute("rel", "noopener noreferrer");
        });
    });
    return (
        <MdPreview id='article-content' value={content} theme={editorTheme} previewTheme="github"></MdPreview>
    );
};

export default ArticleContent;