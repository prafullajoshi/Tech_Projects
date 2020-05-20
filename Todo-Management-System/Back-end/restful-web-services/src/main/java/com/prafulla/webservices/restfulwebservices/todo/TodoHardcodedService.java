package com.prafulla.webservices.restfulwebservices.todo;

import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class TodoHardcodedService
{
	private static List<Todo> todos = new ArrayList<Todo>();
	private static long idCounter = 0;
	
	static 
	{
		todos.add(new Todo(++idCounter, "prafulla", "Learn to Dance", new Date(), false));
		todos.add(new Todo(++idCounter, "prafulla", "Learn about Microservices", new Date(), false));
		todos.add(new Todo(++idCounter, "prafulla", "Learn about Vulkan", new Date(), false));
	}
	
	public List<Todo> findAll()
	{
		return todos;
	}
	
	public Todo deleteById(long id)
	{
		Todo todo = findById(id);
		if(todo == null)
			return null;
		if(todos.remove(todo))
		{
			return todo;
		}
		return null;
	}

	public Todo findById(long id)
	{
		for(Todo todo : todos)
		{
			if(todo.getId() == id)
			{
				return todo;
			}
		}
		return null;
	}
	
	public Todo save(Todo todo)
	{
		if (todo.getId() == -1 || todo.getId() == 0)
		{
			// insert
			todo.setId(++idCounter);
			todos.add(todo);
		} else
		{
			// update
			deleteById(todo.getId());
			todos.add(todo);
		}
		return todo;
	}
}
