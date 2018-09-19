USE sakila;

SELECT first_name, last_name
from actor;

SELECT CONCAT(first_name, " ", last_name) AS full_name
from actor;

SELECT actor_id, first_name, last_name 
from actor 
where first_name = "Joe";

SELECT first_name, last_name 
FROM actor
where last_name like "%gen%";
#using wildcard % to find the information

SELECT first_name, last_name 
FROM actor
where last_name like "%li%"
ORDER BY last_name DESC, first_name DESC;
#sorting by last name descending, first name descending

SELECT country_id, country
from country
where country in ('Afghanistan', 'Bangladesh', 'China');

alter table actor 
add column `description` blob(100) null;
#blob stores it as binary, as opposed to varchar which stores as string.
#storing as binary takes less space, but is slower.
#since we don't think we'll be performing queries on the description
#we're using blob.  
#also, when creating a new column, use the ` symbol instead of '
#(symbol on the tilde key) 

 
alter table actor 
drop column `description`;
#delete the column named description

# List the last names of actors, as well as how many actors have that last name.

SELECT last_name, COUNT(*) FROM actor GROUP BY last_name; 
#from last_name column, from actor table, count number of each unique type and display that number


# 4B ---#--#--#-#--#--#-#-#-#-#-###-#-#-#-#-#-##--#-#-
#print last name and number of matches if count is greater than 1. 
#COUNT(*) FROM actor GROUP BY last_name 

SELECT last_name, COUNT(*) AS 'Count' 
FROM actor
GROUP BY last_name
HAVING Count > 1; 



UPDATE actor
    SET first_name = "HARPO",
        last_name = "WILLIAMS"
    WHERE actor_id = 172;
#update actor table and change fist name of groucho williams to harpo williams.
#where actor_id is what identifies which entry to change. 

#if the first_name of actor is Harpo, change it to groucho
UPDATE actor
    SET first_name = "GROUCHO"
    WHERE first_name = "HARPO" AND last_name = "WILLIAMS";
    

#recreate schema of address table
SHOW CREATE TABLE address;

#DESCRIBE sakila.address

#use join to join first_name and last_name of staff members to their address. use staff adn address table
#join on address_id, display first_name, last_name and address


SELECT staff.first_name, staff.last_name, address.address 
FROM staff
INNER JOIN address
ON staff.address_id = address.address_id;
#display fist_name, last_name, and address of each staff member
#join the two where address_id matches from staff and address tables.  

#use join to print sum of each staff member August 2005. use tables staff and payment.  
# get overlap between staff and payment.  
#total the amount of 'amount' for each staff_id, then join it with the matching name with the staff_id


SELECT payment.staff_id, staff.first_name, staff.last_name, SUM(amount)
FROM payment 
INNER JOIN staff
ON staff.staff_id = payment.staff_id
Group By staff_id;
#how to edit by date range?  below code does not work..
#WHERE DATE(payment_date) BETWEEN '2013-04-05' AND '2005-09-01' 
#print the staff id, first_name, last_name, plus the total they rang up. 

#list each film and total actors listed for it. use film actor and film

SELECT film.title, COUNT(actor_id) as 'total actors' 
FROM film
LEFT JOIN film_actor 
ON film.film_id = film_actor.film_id
GROUP BY title;

#find total hunchback impossible copies

#count number of film_id = X in 'inventory' table 
SELECT SUM(film_id = 439) AS 'total copies'
FROM inventory; 

SELECT c.first_name, c.last_name, SUM(p.amount) 
AS 'total amount'
FROM customer c 
LEFT JOIN payment p ON c.customer_id = p.customer_id
GROUP BY c.first_name, c.last_name
ORDER BY c.last_name;

#print titles of movies that start with k or q and are in english.  
SELECT title
FROM film
WHERE (title LIKE 'K%' OR title LIKE 'Q%') 
AND language_id=(SELECT language_id FROM language where name='English');

#print all actors who appear in Alone Trip
select CONCAT(first_name,' ',last_name) 'Alone Trip Actors'
	from actor
	where actor_id in 
	(select actor_id from film_actor where film_id = 
	(select film_id from film where title = 'Alone Trip'));
    
#use joins to find names and emails of customers in Canada
SELECT first_name, last_name, email 
FROM customer cu
JOIN address a ON (cu.address_id = a.address_id)
JOIN city cit ON (a.city_id=cit.city_id)
JOIN country cntry ON (cit.country_id=cntry.country_id)
WHERE country = 'Canada';

#print movies categozied as family films
SELECT f.title as 'Family Films'
FROM film as f
JOIN film_category as fc on fc.film_id = f.film_id
JOIN category as c on c.category_id = fc.category_id
WHERE c.name = 'Family';
    
#display movies that are rented most often, starting with most popular
SELECT f.title as 'Movie Title', count(r.rental_date) as '# of times rented'
FROM film as f
JOIN inventory as i on i.film_id = f.film_id
JOIN rental as r on r.inventory_id = i.inventory_id
GROUP BY  f.title
ORDER BY COUNT(r.rental_date) desc;
#display movie title and total of rentals
#merge inventory and rental by inventory_id


SELECT s.store_id 'Store ID', SUM(p.amount) 'Total'
FROM payment p
JOIN staff s ON (p.staff_id=s.staff_id)
GROUP BY store_id;
#display total revenue for each store

#display city, country and store_ID
SELECT s.store_id 'Store ID', c.city 'City', cy.country 'Country'
FROM store as s
JOIN address as a on a.address_id = s.address_id
JOIN city as c on c.city_id = a.city_id
JOIN country as cy on cy.country_id = c.country_id
ORDER BY s.store_id;

#display most popular 5 genres by popularity 
#use category, film_category, inventory, payment, and rental tables 
SELECT c.name 'Film', sum(p.amount) 'Gross Revenue'
FROM category as c
JOIN film_category as fc on fc.category_id = c.category_id
JOIN inventory as i on i.film_id = fc.film_id
JOIN rental as r on r.inventory_id = i.inventory_id
JOIN payment as p on p.rental_id = r.rental_id
GROUP BY c.name
ORDER BY sum(p.amount) desc
LIMIT 5;
#Show top 5

#create view using last query to show top 5 in gross revenue
CREATE VIEW Top_Five_Genres as 
SELECT c.name 'Film', sum(p.amount) 'Gross Revenue'
FROM category as c
JOIN film_category as fc on fc.category_id = c.category_id
JOIN inventory as i on i.film_id = fc.film_id
JOIN rental as r on r.inventory_id = i.inventory_id
JOIN payment as p on p.rental_id = r.rental_id
GROUP BY c.name
ORDER BY sum(p.amount) desc
LIMIT 5;

#display top 5 genres
SELECT * 
FROM Top_Five_Genres;

#delete top 5 genres
DROP VIEW Top_Five_Genres
#drops listed view 