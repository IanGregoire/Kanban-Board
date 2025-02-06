import {  ActionFunction } from "@remix-run/node";
import { supabase } from "~/utils/supabase.server";

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const action = formData.get("action");

    if (action === "addColumn") {
        const title = formData.get("title");
        const position = formData.get("position");
        const { error } = await supabase
            .from("columns")
            .insert([{ title, position }]);
        if (error) return Response.json({ error: error.message }, { status: 400 });
    }

    if (action === "addTask") {
        const title = formData.get("title");
        const description = formData.get("description");
        const columnId = formData.get("columnId");
        const position = formData.get("position");
        const startDate = formData.get("startDate");
        const endDate = formData.get("endDate");

        const { error } = await supabase
            .from("tasks")
            .insert([{ title, description, column_id: columnId, position, start_date: startDate, end_date: endDate }]);
        if (error) return Response.json({ error: error.message }, { status: 400 });
    }

    return Response.json({ success: true });
};
