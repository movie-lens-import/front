import os
import psycopg2

def import_csv_with_copy(file_path, table_name):
    conn = psycopg2.connect("dbname=movielens user=postgres password=postgres host=localhost port=5432")
    cursor = conn.cursor()
    
    temp_table_name = f"{table_name}_temp"
    cursor.execute(f"DROP TABLE IF EXISTS {temp_table_name};")
    
    if table_name == 'ratings':
        cursor.execute(f"""
            CREATE TABLE {temp_table_name} (
                userId INT,
                movieId INT,
                rating FLOAT CHECK (rating >= 0.5 AND rating <= 5.0),
                timestamp BIGINT
            );
        """)
    elif table_name == 'tags':
        cursor.execute(f"""
            CREATE TABLE {temp_table_name} (
                userId INT,
                movieId INT,
                tag TEXT,
                timestamp BIGINT
            );
        """)

    with open(file_path, 'r') as f:
        cursor.copy_expert(f"COPY {temp_table_name} FROM stdin WITH CSV HEADER", f)
    
    if table_name == 'ratings':
        cursor.execute(f"""
            ALTER TABLE {temp_table_name} 
            ALTER COLUMN timestamp TYPE TIMESTAMP USING to_timestamp(timestamp);
        """)
    elif table_name == 'tags':
        cursor.execute(f"""
            ALTER TABLE {temp_table_name} 
            ALTER COLUMN timestamp TYPE TIMESTAMP USING to_timestamp(timestamp);
        """)
    
    cursor.execute(f"DROP TABLE IF EXISTS {table_name};")
    cursor.execute(f"ALTER TABLE {temp_table_name} RENAME TO {table_name};")

    
    conn.commit()
    cursor.close()
    conn.close()
    
    os.remove(file_path)

files = {
    '../chunks/ratings.csv': 'ratings',
}

for file, table in files.items():
    import_csv_with_copy(file, table)
