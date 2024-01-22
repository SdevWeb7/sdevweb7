<?php

namespace App\Message;

readonly class ValidationEmail
{

   public function __construct (private int $userID)
   {

   }

   public function getUserID () : int
   {
      return $this->userID;
   }

}