'use client';

import { useEffect } from "react";

const ArticleView = ({ id, children }: { id: number, children: React.ReactNode }) => {
    useEffect(() => {
        if (!id) {
            return;
        }

        fetch(`/api/article/${id}/view`, {
            method: "POST"
        }).catch(error => {
            console.error(error);
        });
    }, [id]);

    return (
        <>{children}</>
    );
};

export default ArticleView;