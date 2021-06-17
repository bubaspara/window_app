import React from "react";

export interface IWindows {
    id: number,
    start_x_l: number | undefined,
    start_y_l: number | undefined,
    height_l: number | undefined,
    width_l: number | undefined,
    endX: number | undefined,
    endY: number | undefined,
    type?: number,
    content?: string
}

export interface IFeeds {
    id: number
    name: string
    background_color?: string
}

export interface IFeedProps {
    feed: {
        id: number,
        name: string,
        background_color?: string,
    },
    id: number
}