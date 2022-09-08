type ResourceIndex = string[];

abstract class Loader<T> {
  path: string;

  constructor(path: string) {
    this.path = path;
  }

  async load(): Promise<T[]> {
    const resourceIndex: ResourceIndex = await fetch(
      `${this.path}/index.json`
    ).then((resp) => resp.json());

    return await Promise.all(
      resourceIndex.map(async (resource) => {
        const resourceJson = await fetch(`${this.path}/${resource}`).then(
          (resp) => resp.json()
        );

        return this.onLoad(resourceJson);
      })
    );
  }

  abstract onLoad(json: any): T;
}

export default Loader;
