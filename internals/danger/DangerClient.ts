/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  type DangerDSLType,
  type DangerResults,
  type GitDSL,
  type GitHubDSL,
  type GitLabDSL,
} from "danger";

declare let results: DangerResults;
declare const warn: (msg: string, file?: string, line?: number) => void;
declare const fail: (msg: string, file?: string, line?: number) => void;
declare const message: (msg: string, file?: string, line?: number) => void;
declare const markdown: (msg: string, file?: string, line?: number) => void;
export type PluginRuntime<Option extends Record<PropertyKey, any> = object> = (
  client: DangerClient,
  options?: Option,
) => void | Promise<void>;

class DangerClient {
  public readonly gitlab: GitLabDSL;

  public readonly github: GitHubDSL;

  public readonly git: GitDSL;

  public readonly results: DangerResults;

  public readonly fail: typeof fail;

  public readonly warn: typeof warn;

  public readonly markdown: typeof markdown;

  public readonly message: typeof message;

  private footnoteString: number;

  public readonly meta: Record<PropertyKey, unknown>;

  private readonly plugins: Array<[PluginRuntime<any>, any]>;

  constructor(danger: DangerDSLType) {
    this.gitlab = danger.gitlab;
    this.git = danger.git;
    this.github = danger.github;
    this.results = results;
    this.fail = fail;
    this.warn = warn;
    this.markdown = markdown;
    this.message = message;
    this.meta = {};
    this.plugins = [];
    this.footnoteString = 0;
  }

  /** @see https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#footnotes */
  private getFootnoteString(): string {
    return `[^${++this.footnoteString}]`;
  }

  public failWithFootnote(content: string, footnote: string) {
    const footnoteString = this.getFootnoteString();

    this.fail(`${content} ${footnoteString}`);
    this.markdown(`${footnoteString}: ${footnote}`);
  }

  public warnWithFootnote(content: string, footnote: string) {
    const footnoteString = this.getFootnoteString();

    this.warn(`${content} ${footnoteString}`);
    this.markdown(`${footnoteString}: ${footnote}`);
  }

  public markdownWithFootnote(content: string, footnote: string) {
    const footnoteString = this.getFootnoteString();

    this.markdown(`${content} ${footnoteString}`);
    this.markdown(`${footnoteString}: ${footnote}`);
  }

  public messageWithFootnote(content: string, footnote: string) {
    const footnoteString = this.getFootnoteString();

    this.message(`${content} ${footnoteString}`);
    this.markdown(`${footnoteString}: ${footnote}`);
  }

  public use<Option extends Record<PropertyKey, any> = object>(
    plugin: PluginRuntime<Option>,
    options?: Option,
  ): this {
    this.plugins.push([plugin, options]);

    return this;
  }

  public async analyze(): Promise<DangerResults> {
    for (const [method, pluginOption] of this.plugins) {
      await method(this, pluginOption);
    }

    return this.results;
  }
}

export default DangerClient;
/* eslint-enable @typescript-eslint/no-explicit-any */
