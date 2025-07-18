import { supabase } from "~/utils/supabase.server";

export async function createProject(userId: string, name: string) {
  return supabase.from("projects").insert({ name, user_id: userId });
}

export async function deleteProject(projectId: string) {
  await supabase.from("tasks").delete().eq("project_id", projectId);
  return supabase.from("projects").delete().eq("id", projectId);
}

export async function createTask(data: any) {
  return supabase.from("tasks").insert(data).select();
}

export async function updateTask(taskId: number, data: any) {
  return supabase.from("tasks").update(data).eq("id", taskId).select();
}

export async function deleteTask(id: string) {
  await supabase.from("task_labels").delete().eq("task_id", id);
  return supabase.from("tasks").delete().eq("id", id);
}

export async function updateTaskLabels(taskId: number, labelIds: String[]) {
  const links = labelIds.map(label_id => ({ task_id: taskId, label_id: Number(label_id), }));
  return supabase.from("task_labels").insert(links);
}

export async function maxPosition(column_id: number) {
    return supabase.from("tasks").select("position").eq("column_id", column_id).order("position", { ascending: false }).limit(1);
}

export async function deleteLabels(id: string) {
    return supabase.from('task_labels').delete().eq('task_id', id);
}