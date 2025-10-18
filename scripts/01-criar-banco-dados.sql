-- Script para criar o banco de dados RUAH_DB e suas tabelas

-- Criar banco de dados
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'RUAH_DB')
BEGIN
    CREATE DATABASE RUAH_DB;
END
GO

USE RUAH_DB;
GO

-- Adicionar tabela de Usuários
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Usuarios')
BEGIN
    CREATE TABLE Usuarios (
        id INT PRIMARY KEY IDENTITY(1,1),
        nome NVARCHAR(255) NOT NULL,
        email NVARCHAR(255) NOT NULL UNIQUE,
        senha_hash NVARCHAR(255) NOT NULL,
        role NVARCHAR(50) NOT NULL DEFAULT 'usuario', -- 'master', 'admin2', 'usuario'
        ativo BIT DEFAULT 1,
        data_criacao DATETIME DEFAULT GETDATE(),
        ultimo_acesso DATETIME
    );
END
GO

-- Adicionar tabela de Serviços
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Servicos')
BEGIN
    CREATE TABLE Servicos (
        id INT PRIMARY KEY IDENTITY(1,1),
        titulo NVARCHAR(255) NOT NULL,
        descricao NVARCHAR(MAX) NOT NULL,
        icone NVARCHAR(100) NOT NULL,
        ordem INT DEFAULT 0,
        acessos INT DEFAULT 0,
        ativo BIT DEFAULT 1,
        criado_por INT,
        data_criacao DATETIME DEFAULT GETDATE(),
        data_atualizacao DATETIME,
        FOREIGN KEY (criado_por) REFERENCES Usuarios(id)
    );
END
GO

-- Criar tabela de Contatos
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Contatos')
BEGIN
    CREATE TABLE Contatos (
        id INT PRIMARY KEY IDENTITY(1,1),
        nome NVARCHAR(255) NOT NULL,
        email NVARCHAR(255) NOT NULL,
        mensagem NVARCHAR(MAX) NOT NULL,
        usuario_id INT,
        data_envio DATETIME DEFAULT GETDATE(),
        FOREIGN KEY (usuario_id) REFERENCES Usuarios(id)
    );
END
GO

-- Criar tabela de Visitas
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Visitas')
BEGIN
    CREATE TABLE Visitas (
        id INT PRIMARY KEY IDENTITY(1,1),
        ip NVARCHAR(50),
        data DATETIME DEFAULT GETDATE(),
        pagina_acessada NVARCHAR(500)
    );
END
GO

-- Criar índices para melhor performance
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_contatos_data')
    CREATE INDEX idx_contatos_data ON Contatos(data_envio);

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_visitas_data')
    CREATE INDEX idx_visitas_data ON Visitas(data);

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_usuarios_email')
    CREATE INDEX idx_usuarios_email ON Usuarios(email);

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_servicos_ordem')
    CREATE INDEX idx_servicos_ordem ON Servicos(ordem, acessos DESC);
GO

-- Inserir usuário master padrão (senha: Master123)
IF NOT EXISTS (SELECT * FROM Usuarios WHERE email = 'master@ruah.com')
BEGIN
    INSERT INTO Usuarios (nome, email, senha_hash, role)
    VALUES ('Administrador Master', 'master@ruah.com', '$2a$10$YourHashedPasswordHere', 'master');
END
GO

-- Inserir serviços padrão
IF NOT EXISTS (SELECT * FROM Servicos WHERE titulo = 'Assessoria para Empresas Privadas')
BEGIN
    INSERT INTO Servicos (titulo, descricao, icone, ordem, criado_por)
    VALUES 
    ('Assessoria para Empresas Privadas', 'Orientação estratégica para empresas que buscam estabelecer parcerias com o setor público, navegando processos licitatórios e regulamentações.', 'Building2', 1, 1),
    ('Consultoria para Gestão Pública', 'Apoio técnico e estratégico para órgãos governamentais na implementação de políticas públicas e otimização de processos administrativos.', 'Users', 2, 1),
    ('Atuação Nacional e Internacional', 'Presença consolidada em níveis municipal, estadual e federal, com expertise em relações internacionais e comércio exterior.', 'Globe', 3, 1);
END
GO
