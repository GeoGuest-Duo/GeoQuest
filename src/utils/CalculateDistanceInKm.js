export const calculateDistanceInKm = (startLat, startLong, endLat, endLong) => {
    const toRadians = (value) => (value * Math.PI) / 180;

    const earthRadius = 6371;

    const diffInLat = toRadians(endLat - startLat);
    const diffInLong = toRadians(endLong - startLong);

    const a =
        Math.sin(diffInLat / 2) * Math.sin(diffInLat / 2) +
        Math.cos(toRadians(startLat)) *
        Math.cos(toRadians(endLat)) *
        Math.sin(diffInLong / 2) *
        Math.sin(diffInLong / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return earthRadius * c;
};