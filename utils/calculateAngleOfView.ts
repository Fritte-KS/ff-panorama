export default function calculateAngleOfView(
  focalLength: number,
  isPortrait: boolean
): number {
  // Set sensor width based on orientation (portrait or landscape).
  const sensorWidth = isPortrait ? 24 : 36;

  // Calculate angle of view and convert from radians to degrees, by multiplying with (180 / Math.PI).
  const angleOfView =
    2 * Math.atan(sensorWidth / (2 * focalLength)) * (180 / Math.PI);

  return angleOfView;
}
