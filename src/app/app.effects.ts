import { LoginEffects } from "./login/effects";
import { UserEffects } from "./user/effects";
import { ClientsEffects } from "./clients/effects";
import { ProductesEffects } from "./productes/effects";
import { LocationsEffects } from "./locations/effects";
import { PaletsEffects } from "./palets/effects";

export const EffectsApp: any[] = [LoginEffects, UserEffects, ClientsEffects, ProductesEffects, LocationsEffects, PaletsEffects];