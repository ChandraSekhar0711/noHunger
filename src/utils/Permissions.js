export class Permissions {
  static async notifications() {
    const permission = await Notification.requestPermission();
    //console.log(permission);
    return permission;
  }
  // static async location() {
  //   const location = await navigator.geolocation.getCurrentPosition(function (
  //     position
  //   ) {
  //     console.log(position);
  //     return position;
  //   });
  //   console.log(location);
  // }
}
