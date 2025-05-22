function logger<T extends new (...args: any[]) => any>(
  target: T,
  ctx: ClassDecoratorContext
) {
  console.log("logger decorator");
  console.log(target);
  console.log(ctx);
  return class extends target {
    age = 33;
  };
}

@logger
class Preson {
  name = "Nik";

  greet() {
    console.log("Hi, I am " + this.name);
  }
}

const nik = new Preson();

nik.greet();
console.log(nik);
