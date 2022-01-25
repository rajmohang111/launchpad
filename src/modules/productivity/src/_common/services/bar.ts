import { Interpolation, cx } from "emotion";
import { ClassNameArg, BarColorProps } from "../components/Bar";

export const getBarContainerColor = (fillLevel: number, css: ClassNameArg, critical: ClassNameArg): Interpolation => {
  switch (true) {
    case fillLevel === 0: {
      return cx(css, critical);
    }
    default: {
      return cx(css);
    }
  }
};

export const getBarColor = (css: ClassNameArg, critical: ClassNameArg, { fillLevel }: BarColorProps): Interpolation => {
  switch (true) {
    case fillLevel === 0: {
      return cx(css, critical);
    }
    default: {
      return css;
    }
  }
};

export const getTextColor = (css: ClassNameArg, critical: ClassNameArg, disabledCss: ClassNameArg, { fillLevel, targetLevel, disabled }: BarColorProps): Interpolation => {
  switch (true) {
    case disabled: {
      return cx(css, disabledCss);
    }
    case fillLevel === 0: {
      return cx(css, critical);
    }
    case fillLevel < Math.min(targetLevel, 100): {
      return cx(css, critical);
    }
    //
    // mgruel: Text color must not be affected by performance
    // but i'm not sure about the relation of the target performance and fill level
    //
    // case fillLevel < Math.min(targetPerformance, 100): {
    //   return cx(css, critical);
    // }
    default: {
      return css;
    }
  }
};
