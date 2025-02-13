CREATE TABLE schedules (
    id SERIAL PRIMARY KEY,
    church_id INTEGER NOT NULL REFERENCES churches(id) ON DELETE CASCADE,
    type VARCHAR(10) CHECK (type IN ('confissão', 'missa')) NOT NULL,
    day_of_week VARCHAR(10) CHECK (day_of_week IN ('domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado')) NOT NULL,
    time TIME NOT NULL
);
