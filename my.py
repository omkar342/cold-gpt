def add_numbers(a, b):
    """
    Function to add two numbers
    
    Args:
        a: First number
        b: Second number
    
    Returns:
        Sum of the two numbers
    """
    return a + b

# Example usage
if __name__ == "__main__":
    # Get input from user
    num1 = float(input("Enter first number: "))
    num2 = float(input("Enter second number: "))
    
    # Calculate sum
    result = add_numbers(num1, num2)
    
    # Display result
    print(f"The sum of {num1} and {num2} is: {result}")
    
    # Alternative: Direct function call with hardcoded values
    print(f"5 + 3 = {add_numbers(5, 3)}")
    print(f"10.5 + 2.7 = {add_numbers(10.5, 2.7)}")
