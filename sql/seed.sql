INSERT INTO authors (name, email, bio) VALUES
('Lucas Fernandez', 'lucasf@gmail.com', 'Desarrollador backend interesado en Node.js'),
('Mariana Torres', 'mariana.torres@gmail.com', 'Frontend developer y amante del diseño web'),
('Diego Ramirez', 'diego.ramirez@gmail.com', 'Programador fullstack con experiencia en React'),
('Sofia Morales', 'sofia.morales@gmail.com', 'Ingeniera de software enfocada en APIs'),
('Martin Acosta', 'martin.acosta@gmail.com', 'Trabaja con infraestructura y DevOps');

INSERT INTO posts (author_id, title, content, published) VALUES
(1, 'Primeros pasos con Node', 'Al empezar con Node.js es importante entender como funciona el event loop y el manejo asincrono.', true),
(2, 'Organizando CSS', 'Una buena organizacion de los estilos ayuda mucho cuando el proyecto empieza a crecer.', true),
(3, 'Introducción a PostgreSQL', 'PostgreSQL es un sistema de base de datos relacional muy potente y confiable para aplicaciones modernas.', true),
(4, 'Que es una API REST', 'Una API REST permite que diferentes aplicaciones puedan comunicarse entre si mediante HTTP.', true),
(5, 'Documentando APIs con Swagger', 'Swagger facilita crear documentación interactiva de tus APIs, lo que ayuda a frontend y a otros desarrolladores.', true);

INSERT INTO comments (post_id, author_id, content) VALUES
(1, 2, 'Buen resumen para alguien que esta empezando'),
(1, 3, 'Me sirvio para repasar algunos conceptos'),
(2, 1, 'Totalmente de acuerdo con organizar los estilos'),
(3, 4, 'PostgreSQL es realmente útil para proyectos serios'),
(4, 5, 'Las APIs REST son fundamentales hoy en dia');