import React from 'react';

type Props = {};

export default function Contribution({}: Props) { // เปลี่ยนชื่อเป็น UserProfile
  return (
    <section className="bg-[#E5D8CA] flex items-start p-8">
        <div className="w-full">
            <h2 className="text-3xl font-bold mb-6">My Contributions</h2>
            <div className="overflow-x-auto">
            <table className="min-w-full ">
                <thead className="border-b">
                <tr>
                    <th className="text-left py-3 px-6 font-semibold text-gray-800">Date</th>
                    <th className="text-left py-3 px-6 font-semibold text-gray-800">Project</th>
                    <th className="text-left py-3 px-6 font-semibold text-gray-800">Amount</th>
                </tr>
                </thead>
                <tbody>
                <tr className="border-b">
                    <td className="py-3 px-6">05/06/2022</td>
                    <td className="py-3 px-6 text-blue-600 hover:underline">Pumpkin Taillys</td>
                    <td className="py-3 px-6">$1200</td>
                </tr>
                <tr className="border-b">
                    <td className="py-3 px-6">15/09/2022</td>
                    <td className="py-3 px-6 text-blue-600 hover:underline">Pumpkin Taillys</td>
                    <td className="py-3 px-6">$2000</td>
                </tr>
                <tr className="border-b">
                    <td className="py-3 px-6">22/01/2023</td>
                    <td className="py-3 px-6 text-blue-600 hover:underline">Pumpkin Taillys</td>
                    <td className="py-3 px-6">$5000</td>
                </tr>
                <tr className="border-b">
                    <td className="py-3 px-6">09/08/2019</td>
                    <td className="py-3 px-6 text-blue-600 hover:underline">Skibidi - Toilets</td>
                    <td className="py-3 px-6">$500</td>
                </tr>
                <tr className="border-b">
                    <td className="py-3 px-6">21/02/2020</td>
                    <td className="py-3 px-6 text-blue-600 hover:underline">Skibidi - Toilets</td>
                    <td className="py-3 px-6">$800</td>
                </tr>
                <tr className="border-b">
                    <td className="py-3 px-6">30/05/2020</td>
                    <td className="py-3 px-6 text-blue-600 hover:underline">Skibidi - Toilets</td>
                    <td className="py-3 px-6">$1000</td>
                </tr>
                <tr className="border-b">
                    <td className="py-3 px-6">11/03/2022</td>
                    <td className="py-3 px-6 text-blue-600 hover:underline">ToyToey - Gym</td>
                    <td className="py-3 px-6">$1000</td>
                </tr>
                <tr className="border-b">
                    <td className="py-3 px-6">12/06/2022</td>
                    <td className="py-3 px-6 text-blue-600 hover:underline">ToyToey - Gym</td>
                    <td className="py-3 px-6">$2000</td>
                </tr>
                <tr className="border-b">
                    <td className="py-3 px-6">28/09/2022</td>
                    <td className="py-3 px-6 text-blue-600 hover:underline">ToyToey - Gym</td>
                    <td className="py-3 px-6">$10000</td>
                </tr>
                </tbody>
            </table>
            </div>
        </div>
</section>

  );
}