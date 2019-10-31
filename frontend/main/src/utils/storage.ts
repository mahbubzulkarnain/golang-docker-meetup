export default class Storage {
  private KEYNAME: string;
  private component: Storage;

  constructor(component: any, keyname: string) {
    this.component = (component ? component : localStorage);
    this.KEYNAME = (keyname && keyname.length > 0 ? keyname : 'storage');
  }

  get getItem(): any {
    try {
      const value = this.component.getItem(this.KEYNAME);
      if (value && value.length > 0) {
        return value
      }
    } catch (e) {
      // @ts-ignore
      console.error(`${this.constructor.name} Error :`, e)
    }
    return null
  }

  setItem(paramValue: any) {
    try {
      // @ts-ignore
      this.component.setItem(this.KEYNAME, paramValue)
    } catch (e) {
      // @ts-ignore
      console.error(`${this.constructor.name} Error :`, e)
    }
  }

  removeItem() {
    try {
      // @ts-ignore
      this.component.removeItem(this.KEYNAME)
    } catch (e) {
      // @ts-ignore
      console.error(`${this.constructor.name} Error :`, e)
    }
  }
}
