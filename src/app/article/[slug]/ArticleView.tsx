"use client";

import { useMount } from "react-use";

const ArticleView = ({ id, children }: { id: number, children: React.ReactNode }) => {

    useMount(() => {
        if (!id) {
            return;
        }
        fetch(`/api/article/${id}/view`, {
            method: "POST",
        }).catch(error => {
            console.error(error);
        });
    });

    return (
        <>
            {children}
        </>
    );
};

export default ArticleView;