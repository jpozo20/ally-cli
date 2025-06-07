type Alias = {
    name: string;
    command: string;
}

type EnvVar = {
    name: string;
    value: string;
}

type Path = {
    directory: string;
    fullPath: string;
}

type Project = {
    name: string;
    path: string;
    autoLoad?: boolean;
    aliases?: Alias[];
    envVars?: EnvVar[];
    paths?: Path[];
}

type Database = {
    filePath?: string;
    projects: Project[];
}

export type { Alias, EnvVar, Path, Project, Database };