import fs from 'fs';
import qr from 'qrcode';


// Function to generate and save QR codes
async function generateQRCodes(coupons, folderPath) {
  // Create the folder if it doesn't exist
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }

    // Generate and save QR codes
    for (let i = 0; i < coupons.length; i++) {
        try {
            await qr.toFile(`${folderPath}/offlinecoupon_${i + 1}.png`, coupons[i]);
            console.log(`QR code ${i + 1} generated successfully.`);
        } catch (err) {
            console.error(`Error generating QR code ${i + 1}:`, err);
        }
    }
}

// Example usage
const coupons = [
  "offlinecoupon1",
  "offlinecoupon2",
  "offlinecoupon3",
  "offlinecoupon4",
  "offlinecoupon5",
  "offlinecoupon6",
  "offlinecoupon7",
  "offlinecoupon8",
  "offlinecoupon9",
  "offlinecoupon10",
  "offlinecoupon11",
  "offlinecoupon12",
  "offlinecoupon13",
  "offlinecoupon14",
  "offlinecoupon15",
  "offlinecoupon16",
  "offlinecoupon17",
  "offlinecoupon18",
  "offlinecoupon19",
  "offlinecoupon20",
  "offlinecoupon21",
  "offlinecoupon22",
  "offlinecoupon23",
  "offlinecoupon24",
  "offlinecoupon25",
  "offlinecoupon26",
  "offlinecoupon27",
  "offlinecoupon28",
  "offlinecoupon29",
  "offlinecoupon30",
  "offlinecoupon31",
  "offlinecoupon32",
  "offlinecoupon33",
  "offlinecoupon34",
  "offlinecoupon35",
  "offlinecoupon36",
  "offlinecoupon37",
  "offlinecoupon38",
  "offlinecoupon39",
  "offlinecoupon40",
  "offlinecoupon41",
  "offlinecoupon42",
  "offlinecoupon43",
  "offlinecoupon44",
  "offlinecoupon45",
  "offlinecoupon46",
  "offlinecoupon47",
  "offlinecoupon48",
  "offlinecoupon49",
  "offlinecoupon50",
  "offlinecoupon51",
  "offlinecoupon52",
  "offlinecoupon53",
  "offlinecoupon54",
  "offlinecoupon55",
  "offlinecoupon56",
  "offlinecoupon57",
  "offlinecoupon58",
  "offlinecoupon59",
  "offlinecoupon60",
  "offlinecoupon61",
  "offlinecoupon62",
  "offlinecoupon63",
  "offlinecoupon64",
  "offlinecoupon65",
  "offlinecoupon66",
  "offlinecoupon67",
  "offlinecoupon68",
  "offlinecoupon69",
  "offlinecoupon70",
  "offlinecoupon71",
  "offlinecoupon72",
  "offlinecoupon73",
  "offlinecoupon74",
  "offlinecoupon75",
  "offlinecoupon76",
  "offlinecoupon77",
  "offlinecoupon78",
  "offlinecoupon79",
  "offlinecoupon80",
  "offlinecoupon81",
  "offlinecoupon82",
  "offlinecoupon83",
  "offlinecoupon84",
  "offlinecoupon85",
  "offlinecoupon86",
  "offlinecoupon87",
  "offlinecoupon88",
  "offlinecoupon89",
  "offlinecoupon90",
  "offlinecoupon91",
  "offlinecoupon92",
  "offlinecoupon93",
  "offlinecoupon94",
  "offlinecoupon95",
  "offlinecoupon96",
  "offlinecoupon97",
  "offlinecoupon98",
  "offlinecoupon99",
  "offlinecoupon100",
  "offlinecoupon101",
  "offlinecoupon102",
  "offlinecoupon103",
  "offlinecoupon104",
  "offlinecoupon105",
  "offlinecoupon106",
  "offlinecoupon107",
  "offlinecoupon108",
  "offlinecoupon109",
  "offlinecoupon110",
  "offlinecoupon111",
  "offlinecoupon112",
  "offlinecoupon113",
  "offlinecoupon114",
  "offlinecoupon115",
  "offlinecoupon116",
  "offlinecoupon117",
  "offlinecoupon118",
  "offlinecoupon119",
  "offlinecoupon120"
];
const folderPath = "qr_codes";

generateQRCodes(coupons, folderPath);
