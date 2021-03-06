import { computed } from "mobx";
import { FormDefinition, GroupDefinition } from "./form";
import {
  Accessor,
  FieldAccess,
  RepeatingFormAccess,
  SubFormAccess,
  GroupAccess
} from "./accessor";
import { FormAccessor } from "./form-accessor";
import { ValidateOptions } from "./validate-options";

// a base class that delegates to a form accessor
export abstract class FormAccessorBase<
  D extends FormDefinition<any>,
  G extends GroupDefinition<D>
> {
  abstract formAccessor: FormAccessor<D, G>;

  initialize() {
    this.formAccessor.initialize();
  }

  async validate(options?: ValidateOptions): Promise<boolean> {
    return this.formAccessor.validate(options);
  }

  @computed
  get context(): any {
    return this.formAccessor.context;
  }

  @computed
  get warningValue(): string | undefined {
    return this.warning;
  }

  @computed
  get errorValue(): string | undefined {
    return this.error;
  }

  @computed
  get error(): string | undefined {
    return this.formAccessor.error;
  }

  @computed
  get warning(): string | undefined {
    return this.formAccessor.warning;
  }

  @computed
  get isValid(): boolean {
    return this.formAccessor.isValid;
  }

  access(name: string): Accessor | undefined {
    return this.formAccessor.access(name);
  }

  accessBySteps(steps: string[]): Accessor | undefined {
    if (steps.length === 0) {
      if (this.formAccessor.parent == null) {
        throw new Error("Unknown parent");
      }
      return this.formAccessor.parent;
    }
    return this.formAccessor.accessBySteps(steps);
  }

  field<K extends keyof D>(name: K): FieldAccess<D, K> {
    return this.formAccessor.field(name);
  }

  repeatingForm<K extends keyof D>(name: K): RepeatingFormAccess<D, K> {
    return this.formAccessor.repeatingForm(name);
  }

  subForm<K extends keyof D>(name: K): SubFormAccess<D, K> {
    return this.formAccessor.subForm(name);
  }

  group<K extends keyof G>(name: K): GroupAccess<D> {
    return this.formAccessor.group(name);
  }

  @computed
  get accessors(): Accessor[] {
    return this.formAccessor.accessors;
  }

  @computed
  get flatAccessors(): Accessor[] {
    return this.formAccessor.flatAccessors;
  }
}
