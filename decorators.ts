function logger<T extends new (...args: any[]) => any>(
  target: T,
  ctx: ClassDecoratorContext
) {
  console.log("logger decorator");
  console.log(target);
  console.log(ctx);
  return class extends target {
    constructor(...args: any[]) {
      super(...args);
      console.log("class constructor");
      console.log(this);
    }
  };
}

function autobind(
  target: (...args: any[]) => any,
  ctx: ClassMemberDecoratorContext
) {
  ctx.addInitializer(function (this: any) {
    this[ctx.name] = this[ctx.name].bind(this);
  });

  return function (this: any) {
    console.log("Execiut original function");
    target.apply(this);
  };
}

function replacer<T>(initiValue: T) {
  return function replacerDecorator(
    target: undefined,
    ctx: ClassFieldDecoratorContext
  ) {
    console.log(target);
    console.log(ctx);
    return (initialValue: any) => {
      console.log(initialValue);
      return initiValue;
    };
  };
}

@logger
class Preson {
  @replacer("Nicolò")
  name = "Nik";

  @autobind
  greet() {
    console.log("Hi, I am " + this.name);
  }
}

const nik = new Preson();
nik.greet();
