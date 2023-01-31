const DatabaseTiers = [
  {
    upto: 15, // GB
    price: 15, // USD
  },
  {
    upto: 34, // GB
    price: 30, // USD
  },
  {
    upto: 56, // GB
    price: 60, // USD
  },
  {
    upto: 120, // GB
    price: 120, // USD
  },
  {
    upto: 400, // GB
    price: 240, // USD
  },
  {
    upto: 845, // GB
    price: 480, // USD
  },
  {
    upto: 1725, // GB
    price: 960, // USD
  },
  {
    upto: 3495, // GB
    price: 1920, // USD
  },
  {
    upto: 5260, // GB
    price: 2880, // USD
  },
  {
    upto: 7025, // GB
    price: 3830, // USD
  },
];
/**
 * @param {number} numOfUsers
 * @returns {number | undefined}
 */
function databasePricingForUsers(numOfUsers) {
  const totalDatabaseSize = (numOfUsers * 2) / 1000;
  for (let tier of DatabaseTiers) {
    if (tier.upto >= totalDatabaseSize) {
      return tier.price;
    }
  }
}

const videoSizePerMinute = 0.2;

/**
 * This function assumes linear growth of the platform
 * @param {number} numOfChannels
 * @param {number} averageVideosPerDay
 * @param {number} averageVideoLength
 * @param {number} daysSinceLaunch
 */
function storagePricingForChannels(
  numOfChannels,
  averageVideosPerDay,
  averageVideoLength,
  daysSinceLaunch
) {
  const sizePerVideo = videoSizePerMinute * averageVideoLength;
  const sizePerChannelPerDay = sizePerVideo * averageVideosPerDay;
  const averageNumOfChannels = numOfChannels / 2;
  const averageUploadsPerDay = averageNumOfChannels * sizePerChannelPerDay;
  const totalUploadsInGivenDays = averageUploadsPerDay * daysSinceLaunch;
  if (totalUploadsInGivenDays < 250) {
    return 5;
  } else {
    return totalUploadsInGivenDays * 0.02;
  }
}

/**
 * @param {number} numOfUsers
 * @param {number} averageWatchTimePerDay
 */
function CDNPricingForUsers(numOfUsers, averageWatchTimePerDay) {
  const watchTimePerDay = numOfUsers * averageWatchTimePerDay;
  const totalWatchTimePerMonth = 30 * watchTimePerDay;
  const totalGB = totalWatchTimePerMonth * videoSizePerMinute;
  const paidGB = Math.max(totalGB - 1000, 0);
  return paidGB * 0.01;
}

function appHostingPricingForUsers(numOfUsers) {
  return Math.ceil(numOfUsers / 3000) * 42;
}

// console.log(
//     (databasePricingForUsers(10000) || 0) +
//         storagePricingForChannels(1000, 2, 1, 365) +
//         CDNPricingForUsers(10000, 15) +
//         appHostingPricingForUsers(10000)
// );

/**
 * @param {string} id
 */
function getValue(id) {
  //@ts-ignore
  return document.querySelector(id)?.value;
}

document.querySelector("button")?.addEventListener("click", function () {
  console.log("clicked!");
  const data = {
    numOfUsers: Number(getValue("#num-of-users")),
    numOfChannels: Number(getValue("#num-of-channels")),
    averageVideosPerDay: Number(getValue("#average-video-uploads")),
    averageVideoLength: Number(getValue("#average-video-length")) / 60,
    daysSinceLaunch: Number(getValue("#days-since-launch")),
    averageWatchTimePerDay: Number(getValue("#average-watch-time-per-day")),
  };
  const databasePricing = databasePricingForUsers(data.numOfUsers);
  if (!databasePricing) {
    return alert("Not calculated for that many users!");
  }
  // @ts-ignore
  document.querySelector("#database-pricing").innerHTML = `${databasePricing}`;
  const storagePricing = storagePricingForChannels(
    data.numOfChannels,
    data.averageVideosPerDay,
    data.averageVideoLength,
    data.daysSinceLaunch
  );
  // @ts-ignore
  document.querySelector("#storage-pricing").innerHTML = `${storagePricing}`;
  const CDNPricing = CDNPricingForUsers(
    data.numOfUsers,
    data.averageWatchTimePerDay
  );
  // @ts-ignore
  document.querySelector("#cdn-pricing").innerHTML = `${CDNPricing}`;
  const appHostingPricing = appHostingPricingForUsers(data.numOfUsers);
  // @ts-ignore
  document.querySelector(
    "#app-hosting-pricing"
  ).innerHTML = `${appHostingPricing}`;
  // @ts-ignore
  document.querySelector("#total-pricing").innerHTML = `${
    databasePricing + storagePricing + CDNPricing + appHostingPricing
  }`;
});
