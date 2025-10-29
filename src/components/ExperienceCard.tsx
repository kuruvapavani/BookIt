"use client";

import React from "react";
import { useRouter } from "next/navigation";

type ExperienceProps = {
  _id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  location: string;
};

export default function ExperienceCard({
  _id,
  title,
  description,
  image,
  price,
  location,
}: ExperienceProps) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/experience/${_id}`)}
      className="cursor-pointer w-[280px] h-[312px] bg-white rounded-[12px] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col bg-[#F0F0F0]"
    >
      {/* Image Section */}
      <div className="w-full h-[170px] overflow-hidden rounded-t-[12px]">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Text Section */}
      <div className="flex flex-col justify-between flex-1 py-3 bg-[#F0F0F0]">
        <div className="flex items-center justify-between mb-2 px-[12px]">
          <h2 className="text-[16px] font-semibold text-[#161616] leading-[20px]">
            {title}
          </h2>
          <span className="text-[11px] font-semibold bg-[#D6D6D6] px-[12px] py-[4px] rounded-md">
            {location}
          </span>
        </div>

        <p className="text-[13px] text-[#6C6C6C] leading-[18px] px-[12px] mb-2">
          {description}
        </p>

        <div className="flex items-center justify-between px-[12px] mt-auto">
          <p className="text-[14px] text-[#161616]">
            From{" "}
            <span className="font-semibold text-[18px] leading-none">
              ₹{price}
            </span>
          </p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/experience/${_id}`);
            }}
            className="bg-[#FFD643] hover:bg-[#f8ca1a] font-semibold text-[14px] px-4 py-[6px] rounded-md transition-colors duration-300 border-none cursor-pointer"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
