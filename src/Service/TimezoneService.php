<?php

namespace App\Service;

class TimezoneService
{
   private string $timezone;

   public function __construct(string $timezone)
   {
      $this->timezone = $timezone;
      date_default_timezone_set($timezone);
   }

}