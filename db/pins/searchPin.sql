-- NOT SURE HOW THIS WORKS BELOW AND NONE WORK RIGHT NOW. TEST LATER. I was limited by the technology of my time. But you can achieve my lifes work Tony.

select *
from pin
where title = %ice% OR description = %'ice'% OR state = %'ice'% or country = %'ice'%


select *
from pin
where title like `%${search_input}%` OR desc like %'ice'% OR state like %'ice'% or country like %'ice'%

select *
from pin
where title like '%WA%' OR description like '%WA%' OR state like '%WA%' or country like '%WA%'