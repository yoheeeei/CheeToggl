const CheeToggl = require("./CheeToggl.js");
const cheeToggl = new CheeToggl({
  apiToken: "YOUR_API_TOKEN",
  datetimeFormat: "YYYY/MM/DD h:mm",
  timeZone: "Asia/Tokyo",
});

const data = require("./data.json");

const workingPid = 0000000; // YOUR WORK PROJECT ID
const workingDescription = "work";
const breakPid = 0000000; // YOUR BREAKING TIME PROJECT ID

(async () => {
  const list = data.map((d) => {
    return [
      {
        description: workingDescription,
        pid: workingPid,
        start: d.start,
        stop: `${d.start.slice(0, -5)}13:00`,
        billiable: true,
      },
      {
        description: "lunch",
        pid: breakPid,
        start: `${d.start.slice(0, -5)}13:00`,
        stop: `${d.start.slice(0, -5)}14:00`,
        billiable: true,
      },
      {
        description: workingDescription,
        pid: workingPid,
        start: `${d.start.slice(0, -5)}14:00`,
        stop: d.end,
        billiable: true,
      },
    ];
  });

  const interval = 1000;

  for (let i = 0; i < list.length; i++) {
    setTimeout(() => {
      cheeToggl.add([...list[i]]);
      console.log("*");
    }, i * interval);
  }
  console.log("complete.");
})();
