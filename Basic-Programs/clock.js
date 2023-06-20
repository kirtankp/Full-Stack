let d = new Date();

let updateTime = () => {
  let hour = d.getHours();
  let minute = d.getMinutes().toString().padStart(2, "0");
  let second = d.getSeconds().toString().padStart(2, "0");

  let hour12Format = (hour % 12 || 12).toString().padStart(2, "0");
  let hour24Format = hour.toString().padStart(2, "0");
  let amOrPm = hour < 12 ? "AM" : "PM";

  console.clear();
  console.log(`${hour24Format}:${minute}:${second}`);
  console.log(`${hour12Format}:${minute}:${second} ${amOrPm}`);
  d.setSeconds(d.getSeconds() + 1);
};
setInterval(updateTime,1000);
