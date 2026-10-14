// The entry Home Assistant loads is tiny: the app itself comes in hashed chunks, so a new version is never served from
// an old cache and the parts that are only needed later (settings, the 3D plan, room detection…) load when opened.
import("./app");
