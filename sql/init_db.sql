CREATE TABLE IF NOT EXISTS products (
    real_id BIGINT,
    id BIGINT PRIMARY KEY,
    name_cte TEXT,
    name_category TEXT,
    model TEXT,
    manufacturer TEXT
);