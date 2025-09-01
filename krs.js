// // krs.js
// import puppeteer from "puppeteer";

// const cookies = [
//   {
//     name: ".AspNetCore.Antiforgery.Nk1pzA5SZfI",
//     value: "CfDJ8H3cBZxs2PhPr61bOy4go1l1vKoE4cvhFd6YJ3iNz00_81Z1KHpzih43C2iFmrqIsMLFrFRnUWFH9XuHz912E4UWMofWFwTnEURQThnZbbW61KM9DcY9-B7duaQAE0SHLWUKcFMZngjJnAiVW7puUTs",
//     domain: "server07.upnjatim.ac.id",
//     path: "/"
//   },
//   {
//     name: ".AspNetCore.Mvc.CookieTempDataProvider",
//     value: "CfDJ8H3cBZxs2PhPr61bOy4go1n_ArwIlt-GepKZxzcPtQxwyek2m9htFbRMt0M5x5qwMeVZ_3vt4Vxev8S5VbPeEsunO3FGACkbpJNHZxMtsTn6BGeCQo2vm7XqHgPBCUhQ6dtpRK_Nwx2GH75Nw5L7F4mchLS4yey54e0_VKhPWXW7e_DbegR2g0FJiLG_M5Li54AdMJhGbI9QO5OiMoBo0Bslh43-h8I53PZk0kP6OzxW1NrYZsXxhT_eJEPIk15BfO7LBN5JDkYNCPzvexGKvYtyrVzkllebLCWoRXvNWFPovyuUpTWcLnwXaODHklW7LVgT8IwpLDKYZSC4KMAj7kpQk1i1PXse5nNHYQ1T8Fktxu9q2LtNBi8No5vElfJq7FsqKotlWH-m_qrbE1jNERGb2R8Ns07VoF8Oo98fvOcnMAkOR2vfYgR-bnuhuVWRqJvaUvbfNSU62j_jsSK6GIo",
//     domain: "server07.upnjatim.ac.id",
//     path: "/"
//   },
//   {
//     name: ".AspNetCore.Session",
//     value: "CfDJ8H3cBZxs2PhPr61bOy4go1nypHufUB6KD5vvfPUtnDJnTBrr5GG5RtLr4BcBgVa4C5FhoRlzbPuU4bM5mu%2FaYxZijp70QS0f9aOEwOBT%2BUCFElw8oSjHvJ9LvcA0V1ktakMqoClUaXMw4Y2epUtdYUTLQGjF%2FkdY6owBr%2FWb2Gfa",
//     domain: "server07.upnjatim.ac.id",
//     path: "/"
//   }
// ];

// const url = "https://server07.upnjatim.ac.id/KrsReguler";

// const targets = [
//   { name: "Manajemen Proyek E", row: 45, done: false },
//   { name: "Pengenalan Pola A", row: 73, done: false }
// ];

// (async () => {
//   const browser = await puppeteer.launch({
//     headless: true,
//     args: ["--no-sandbox", "--disable-setuid-sandbox"]
//   });
//   const page = await browser.newPage();
//   await page.setCookie(...cookies);

//   // buka halaman pertama
//   await page.goto(url);

//   page.on("dialog", async dialog => {
//     console.log("⚠️ Popup:", dialog.message());
//     await dialog.accept();
//   });

//   while (true) {
//     const waktu = new Date().toLocaleTimeString();
//     console.log(`🔄 [${waktu}] Refresh...`);
//     await page.reload();

//     for (const target of targets) {
//       if (target.done) continue; // skip kalau sudah klik

//       try {
//         console.log(`   ➡️ Cek kelas ${target.name}...`);

//         const statusCell = await page.$(
//           `body > div > main > table > tbody > tr:nth-child(${target.row}) > td:nth-child(12)`
//         );

//         const imgSrc = statusCell
//           ? await page.evaluate(el => {
//               const img = el.querySelector("img");
//               return img ? img.getAttribute("src") : null;
//             }, statusCell)
//           : null;

//         if (!imgSrc) {
//           console.log(`   ⚠️ ${target.name}: tidak ada ikon.`);
//         } else if (imgSrc.includes("notselect.png") || imgSrc.includes("x.png")) {
//           console.log(`   ❌ ${target.name}: penuh.`);
//         } else if (imgSrc.includes("select.png")) {
//           console.log(`   ✅ ${target.name}: tersedia, klik...`);
//           const img = await page.$(
//             `body > div > main > table > tbody > tr:nth-child(${target.row}) > td:nth-child(12) img`
//           );
//           if (img) {
//             await img.click();
//             target.done = true;
//             console.log(`   👉 ${target.name} sudah diklik.`);
//           }
//         } else {
//           console.log(`   ℹ️ ${target.name}: status lain (${imgSrc})`);
//         }
//       } catch (err) {
//         console.error(`   ❌ Error cek ${target.name}:`, err.message);
//       }
//     }

//     // stop kalau semua target sudah beres
//     if (targets.every(t => t.done)) {
//       console.log("🎉 Semua kelas berhasil diambil. Bot berhenti.");
//       break;
//     }

//     // tunggu 3 detik sebelum reload
//     await new Promise(r => setTimeout(r, 3000));
//   }

//   await browser.close();
// })();

// krs.js
import puppeteer from "puppeteer";

// ✅ ubah true/false sesuai kebutuhan
const IS_HEADLESS = true;

const cookies = [
  {
    name: ".AspNetCore.Antiforgery.Nk1pzA5SZfI",
    value: "CfDJ8H3cBZxs2PhPr61bOy4go1kPJkWjtr7LoqVQ4cDQHNZllxQzBzpaRSeaWIHlS9gRITx6eb0LBOJ6KSmFPfsNZ6F6UKOmY-yFG1PG27Z-GfPdoKOxOysvA3QFujbERUhM8ATh74NR1-n7y7t7s7-F5vI",
    domain: "server07.upnjatim.ac.id",
    path: "/"
  },
  {
    name: ".AspNetCore.Mvc.CookieTempDataProvider",
    value: "CfDJ8H3cBZxs2PhPr61bOy4go1nAoLpqfdMlkxgGsfoxCFAwq4jWlQppKoUZElejLyFhhkF19zo6jOAUYzo79e_UNv9R8Xk1yxouwFGcAez9vAcz7EcuIZLlY6u4E6bHfixiqDwkR5yb89FI6_PnI5mY7TLdc74uopOH5uIVcLvCbY1bYUfD9qzfGkSDigka8qf93G6-YceihUFKtXVL07D8fKMOV-TY82ryyn7fUOqPvzsU9NQRj2PtCUvlCWXRCRW7XzIgmG1bs8SzXq8oZQU69pjl7IQcaSEJhBWbIfJhEsxseuKZiOJ_JZEMFkJ2OvE9rmKz36X08kQzpa536DwJzJrbU55sr92yGKuKQ4Vop8MN0Si9_5AOrJp8ADqCJo5Jk7NSh4hHeUfS86ey0wzBOrD_MZJY5XiF-dJoECaqm3z5",
    domain: "server07.upnjatim.ac.id",
    path: "/"
  },
  {
    name: ".AspNetCore.Session",
    value: "CfDJ8H3cBZxs2PhPr61bOy4go1m7FypX73Rdf3yLBXYfFZ6CmPYn3M%2BiFWfzLS3jnfhFFDTHTd3SPWSTQQczAIdatlTPOwYAeDNaEYZ1YN6hh9y9eVBEPJWQ9iF1J0N6PuyNM1DM4IRYIpaHRaLtkG6MJPfqBkDhdUApL5C6WZ3DXNLp",
    domain: "server07.upnjatim.ac.id",
    path: "/"
  }
];


const url = "https://server07.upnjatim.ac.id/KrsReguler";

(async () => {
  const browser = await puppeteer.launch({
    headless: IS_HEADLESS,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const page = await browser.newPage();

  async function applyCookies() {
    await page.setCookie(...cookies);
  }

  await applyCookies();
  await page.goto(url);

  while (true) {
    const waktu = new Date().toLocaleTimeString();
    console.log(`🔄 [${waktu}] Refresh...`);

    try {
      await applyCookies(); 
      await page.reload();

      // cek Pengenalan Pola A (row 73)
      console.log("   ➡️ Cek kelas Pengenalan Pola A...");
      const statusCell = await page.$("body > div > main > table > tbody > tr:nth-child(73) > td:nth-child(12)");
      const imgSrc = statusCell
        ? await page.evaluate(el => {
            const img = el.querySelector("img");
            return img ? img.getAttribute("src") : null;
          }, statusCell)
        : null;

      if (!imgSrc) {
        console.log("   ⚠️ Tidak ada ikon (mungkin session habis, pasang ulang cookie).");
        await applyCookies();
      } else if (imgSrc.includes("notselect.png") || imgSrc.includes("x.png")) {
        console.log("   ❌ Pengenalan Pola A penuh.");
      } else if (imgSrc.includes("select.png")) {
        console.log("   ✅ Pengenalan Pola A tersedia! Klik untuk ambil...");

        const img = await page.$("body > div > main > table > tbody > tr:nth-child(73) > td:nth-child(12) img");
        if (img) {
          page.on("dialog", async dialog => {
            console.log("   ⚠️ Popup konfirmasi:", dialog.message());
            await dialog.accept();
          });

          await img.click();
          console.log("   👉 Sudah klik gambar select.png.");
          break; 
        }
      } else {
        console.log("   ℹ️ Status lain:", imgSrc);
      }
    } catch (err) {
      console.error("❌ Error:", err.message);
      await applyCookies(); 
    }

    await new Promise(r => setTimeout(r, 3000));
  }

  await browser.close();
})();
