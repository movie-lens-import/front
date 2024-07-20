export interface Task {
  id: number;
  name: string;
  status: string;
  created_at: string;
  updated_at: string;
  completed_at: string;
  result: string | null;
  table_name: string;
  job_id: string;
  processing_time: number;
  rows_failed: number;
  rows_inserted: number;
}
