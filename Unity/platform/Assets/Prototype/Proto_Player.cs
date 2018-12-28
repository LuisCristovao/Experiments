using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Proto_Player : MonoBehaviour {



    private Rigidbody2D rb;
    public float speed = 2;
    public float change_dir_force = 2;
    public float jump_strenght = 10;
    public bool on_air = false;
    

    // Use this for initialization
    void Start () {
        rb = GetComponent<Rigidbody2D>();
        on_air = false;
    }
	
	// Update is called once per frame
	void Update () {

        

        if (Input.GetKey("d") )
        {
            //rb.velocity = new Vector2(speed, 0);
            if (rb.velocity.x < 0)
            {
                rb.AddForce(new Vector2(change_dir_force*speed, 0));
            }
            else {
                rb.AddForce(new Vector2(speed, 0));
            }
            
        }

        if (Input.GetKey("a"))
        {
            if (rb.velocity.x > 0)
            {
                rb.AddForce(new Vector2(change_dir_force * -speed, 0));
            }
            else
            {
                rb.AddForce(new Vector2(-speed, 0));
            }
        }

        if (Input.GetKey("w"))
        {
            //rb.velocity = new Vector2(0, jump_strenght);
            if (!on_air)
            {
                rb.AddForce(new Vector2(0, jump_strenght));
                on_air = true;
            }
            else
            {
                
                rb.AddForce(new Vector2(0, 4*rb.gravityScale));
            }
            

        }
        if (on_air)
        {
            rb.AddForce(new Vector2(0, 4*rb.gravityScale));
        }
    }
        

    

    private void OnCollisionEnter2D(Collision2D collision)
    {
        on_air = false;
    }







}
