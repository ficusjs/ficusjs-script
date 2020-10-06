export interface ESScript {
    url: String
}

export interface ESModule {
    url: String,
    type: 'module'
}

type ScriptOptions = String | ESModule | ESScript

export declare function loadScript (script: ScriptOptions): Promise<any>
