export interface Tagged<a extends string> {
  _tag: a;
}

export type Untagged<a extends Tagged<any>> = Omit<a, '_tag'>;

export namespace Tags {}
