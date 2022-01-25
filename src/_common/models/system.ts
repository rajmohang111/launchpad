export function getRegionFrom(regionString: string): Region {
  // 2018-10-08 mgruel: I've selected to use the switch to resist the lookup of invalid regions
  // ```return regionString as Region;``` might simplify the lookup but it might expand the Region enum unexpectedly
  switch (regionString) {
    case Region.CHINA: {
      return Region.CHINA;
    }
    case Region.OTHER: {
      return Region.OTHER;
    }
    case Region.DEVELOPMENT: {
      return Region.DEVELOPMENT;
    }
    default: {
      throw new Error("Region not found");
    }
  }
}

export enum Region {
  CHINA = "region_china",
  OTHER = "region_other_regions",
  DEVELOPMENT = "region_development",
}
