#include <linux/module.h>
#include <linux/fs.h>
#include <linux/cdev.h>
#include <linux/device.h>
#include <linux/errno.h>
#include <asm/uaccess.h>
#include <linux/kernel.h>
#include <linux/delay.h>
#include <asm/io.h>
#include <linux/serial_reg.h>

#define FIRST_MINOR 0
#define MINOR_CNT 1


#define SERIAL_PORT_BASE 0x3F8


static dev_t dev;
static struct cdev c_dev;
static struct class *cl;

static int my_open(struct inode *i, struct file *f)
{
	return 0;
}
static int my_close(struct inode *i, struct file *f)
{
	return 0;
}

static char c = 'A';

static ssize_t my_read(struct file *f, char __user *buf, size_t len, loff_t *off)
{
	if (*off == 0)
	{
		if (copy_to_user(buf, &c, 1))
		{
			return -EFAULT;
		}
		*off += 1;
		return 1;
	}
	else
		return 0;
}
static void set_seq(void)
{
	u8 data, clock;

	/* Pulling the Tx line low */
	data = inb(SERIAL_PORT_BASE + UART_LCR);
	data |= UART_LCR_SBC;
	outb(data, SERIAL_PORT_BASE + UART_LCR);

	/* Sending the -ve edge (high->low) clock over DTR */
	clock = inb(SERIAL_PORT_BASE + UART_MCR);
	clock |= UART_MCR_DTR;
	outb(clock, SERIAL_PORT_BASE + UART_MCR);
	msleep(10);
	clock = inb(SERIAL_PORT_BASE + UART_MCR);
	clock &= ~UART_MCR_DTR;
	outb(clock, SERIAL_PORT_BASE + UART_MCR);
	msleep(10);
}

static void reset_seq(void)
{
	u8 data, clock;

	/* Defaulting the Tx line high */
	data = inb(SERIAL_PORT_BASE + UART_LCR);
	data &= ~UART_LCR_SBC;
	outb(data, SERIAL_PORT_BASE + UART_LCR);

	/* Sending the -ve edge (high->low) clock over DTR */
	clock = inb(SERIAL_PORT_BASE + UART_MCR);
	clock |= UART_MCR_DTR;
	outb(clock, SERIAL_PORT_BASE + UART_MCR);
	msleep(10);
	clock = inb(SERIAL_PORT_BASE + UART_MCR);
	clock &= ~UART_MCR_DTR;
	outb(clock, SERIAL_PORT_BASE + UART_MCR);
	msleep(10);
}

static ssize_t my_write(struct file *f, const char __user *buf, size_t cnt, loff_t *off)
{
	int i, j;
	unsigned char val;
	printk("\nWriting into the kernel By the node .....\n");
	

		if (copy_from_user(&val, buf + i, 1))
		{
			return -EFAULT;
		}	
		for (j = 0; j < 8; j++)
		{
		
			
			set_seq();
			
			
		}
		msleep(1000);
		for (j = 0; j < 8; j++)
		{
			
			
			reset_seq();	
				
						
		}

	return cnt;
}

static struct file_operations driver_fops =
{
	.owner = THIS_MODULE,
	.open = my_open,
	.release = my_close,
	.read = my_read,
	.write = my_write
};

static int __init fcd_init(void)
{
	int ret;
	struct device *dev_ret;
	printk("\nThe Node Communicator:Project by K.R.Shylaja and Karthic.Rao\n");
	if ((ret = alloc_chrdev_region(&dev, FIRST_MINOR, MINOR_CNT, "final_driver")) < 0)
	{
		return ret;
	}

	cdev_init(&c_dev, &driver_fops);

	if ((ret = cdev_add(&c_dev, dev, MINOR_CNT)) < 0)
	{
		unregister_chrdev_region(dev, MINOR_CNT);
		return ret;
	}
	
	if (IS_ERR(cl = class_create(THIS_MODULE, "char")))
	{
		cdev_del(&c_dev);
		unregister_chrdev_region(dev, MINOR_CNT);
		return PTR_ERR(cl);
	}
	if (IS_ERR(dev_ret = device_create(cl, NULL, dev, NULL, "mychar%d", 0)))
	{
		class_destroy(cl);
		cdev_del(&c_dev);
		unregister_chrdev_region(dev, MINOR_CNT);
		return PTR_ERR(dev_ret);
	}

	return 0;
}

static void __exit fcd_exit(void)
{
	printk("\nNode Communicator Driver is Being Removed\n");
	device_destroy(cl, dev);
	class_destroy(cl);
	cdev_del(&c_dev);
	unregister_chrdev_region(dev, MINOR_CNT);
}

module_init(fcd_init);
module_exit(fcd_exit);

MODULE_LICENSE("GPL");
MODULE_AUTHOR("Karthic Rao and Shylaja.K.R");
MODULE_DESCRIPTION("Device Driver being Controlled by the Node Web Server");
