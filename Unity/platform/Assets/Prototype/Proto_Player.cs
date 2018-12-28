using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Proto_Player : MonoBehaviour {



    private Rigidbody2D rb;
    public float speed = 2;
    public float jump_strenght = 10;

    // Use this for initialization
    void Start () {
        rb = GetComponent<Rigidbody2D>();

	}
	
	// Update is called once per frame
	void Update () {

        if (Input.GetKey("d") )
        {
            //rb.velocity = new Vector2(speed, 0);
            rb.AddForce(new Vector2(speed, 0));
        }

        if (Input.GetKey("a"))
        {
            //rb.velocity = new Vector2(-speed, 0);
            rb.AddForce(new Vector2(-speed, 0));
        }

        if (Input.GetKeyDown("w"))
        {
            //rb.velocity = new Vector2(0, jump_strenght);
            rb.AddForce(new Vector2(0, jump_strenght));

        }

        

    }

    






}
